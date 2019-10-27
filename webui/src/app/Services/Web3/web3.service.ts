import { ContractService } from 'src/app/Services/Contracts/contract.service'
import { Injectable } from '@angular/core'
import { BehaviorSubject, interval, Subscription } from 'rxjs'
import { Web3Model } from '../../Models/web3.model'
import { HttpClient } from '@angular/common/http'
import { WebSocketService } from '../WebSocket/web-socket.service'
declare let require: any

const Web3 = require('web3')

declare let window: any
declare let ethereum: any
declare let web3: any
// const BaseUrl = 'http://' + window.location.hostname + ':3010/contracts/';

// anugalr service to loggin with metamask

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  constructor(
    private httpClient: HttpClient,
    private webSocketService: WebSocketService,
    private _ContractService: ContractService
  ) {}
  public Web3Details$: BehaviorSubject<Web3Model> = new BehaviorSubject<
    Web3Model
  >({
    account: null,
    network: null
  })
  private RefreshedAccount = interval(1000)
  public AccountSubscription: Subscription
  public async web3login() {
    return new Promise(async (resolve, reject) => {
      // check dapp browser
      if (window.ethereum || window.web3) {
        // Modern dapp browsers...
        if (window.ethereum) {
          window.web3 = new Web3(ethereum)
          try {
            // Request account access if needed
            await ethereum.enable()
            // Acccounts now exposed
          } catch (error) {
            // User denied account access...
            reject(error)
          }
        }
        //Legacy dapp browsers...
        else {
          window.web3 = new Web3(web3.currentProvider)
        }
        // check contract deployed on this network
        const Net = await this.GetNetwork()

        // observe changes on  account and network
        this.AccountSubscription = this.RefreshedAccount.subscribe(async () => {
          let Account = await this.GetAccount()
          const Network = await this.GetNetwork()
          if (
            this.Web3Details$.value.network !== Network ||
            this.Web3Details$.value.account !== Account
          ) {
            this.webSocketService.UserIsOffline(this.Web3Details$.value.account)
            this.webSocketService.UserIsOnline(Account)
            this.Web3Details$.next({
              account: Account,
              network: Network
              // gameinstance: GameInstance,
              // tokenInstance: TokenInstance,
              // towninstance: TownInstance
            })
          }
          localStorage.setItem('isLogged', 'true')
          if (Account == null) {
            await this.web3logout()
            Account = null
            reject('Something Went Wrong')
          }
          resolve('Logged In')
        })
      }
      // Non-dapp browsers...
      else {
        reject(
          'Non-Ethereum browser detected. You should consider trying MetaMask!'
        )
      }
    })
  }
  // logout function
  public async web3logout() {
    this.webSocketService.UserIsOffline(this.Web3Details$.value.account)
    this.AccountSubscription.unsubscribe()
    this.Web3Details$.next({
      account: null,
      network: null
      // gameinstance: null,
      // tokenInstance: null,
      // towninstance: null
    })
    localStorage.setItem('isLogged', 'false')
  }
  private async GetAccount(): Promise<string> {
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts((err, accs) => {
        if (err != null) {
          resolve(null)
        }

        // Get the initial account balance so it can be displayed.
        if (accs.length === 0) {
          resolve(null)
        } else {
          this._ContractService.updateAccount(accs[0])
          resolve(accs[0])
        }
      })
    })
  }
  private GetNetwork(): Promise<string> {
    return new Promise((resolve, reject) => {
      window.web3.eth.net.getId((err, netId) => {
        if (err) {
          reject('Something Went Wrong, while getting network ID ')
        }
        resolve(netId)
      })
    })
  }
}
