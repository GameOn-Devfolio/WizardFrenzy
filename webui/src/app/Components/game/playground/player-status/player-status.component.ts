import { async } from '@angular/core/testing'
import { Component, OnInit } from '@angular/core'
import { ContractService } from 'src/app/Services/Contracts/contract.service'

@Component({
  selector: 'app-player-status',
  templateUrl: './player-status.component.html',
  styleUrls: ['./player-status.component.scss']
})
export class PlayerStatusComponent implements OnInit {
  Contract: any
  account: any
  constructor(private _ContractService: ContractService) {}

  ngOnInit() {
    this.Contract = this._ContractService.getWizardContract()
    this._ContractService.currentAccount.subscribe((accs) => {
      this.account = accs
    })
  }
  newPlayer = async () => {
    try {
      const newPlayer = await this.Contract.methods.playerRegister().send({
        from: this.account,
        gas: 5000000
      })
      console.log(newPlayer)
    } catch (error) {
      console.log(error)
    }

    // newPlayer.status ? this.listingRodDta() : alert('Code REd')
  }
}
