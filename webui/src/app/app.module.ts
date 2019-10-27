import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MaterialModule } from './Modules/material/material.module'
import { GameComponent } from './Components/game/game.component'

import { MainNavComponent } from './Components/other/main-nav/main-nav.component'
import { HomeComponent } from './Components/home/home.component'
import { HomeRouteComponent } from './Components/home/home-route/home-route.component'
import { AboutComponent } from './Components/home/about/about.component'
import { HttpClientModule } from '@angular/common/http'

import { PlaygroundComponent } from './Components/game/playground/playground.component'
import { PlayerlistComponent } from './Components/game/playground/playerlist/playerlist.component'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'
import { ReactiveFormsModule } from '@angular/forms'
import { AddCardComponent } from './Components/admin/add-card/add-card.component'
import { EditCardComponent } from './Components/admin/edit-card/edit-card.component'
import { DeleteCardComponent } from './Components/admin/delete-card/delete-card.component'
import { AdminrouterComponent } from './Components/admin/adminrouter/adminrouter.component'
import { PlayerStatusComponent } from './Components/game/playground/player-status/player-status.component'
import { WizardsComponent } from './Components/game/playground/wizards/wizards.component'
import { UpgradeComponent } from './Components/game/playground/upgrade/upgrade.component'
import { HistoryComponent } from './Components/game/playground/history/history.component'
import { BattleComponent } from './Components/game/playground/battle/battle.component'

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    MainNavComponent,
    HomeComponent,
    HomeRouteComponent,
    AboutComponent,
    PlaygroundComponent,
    PlayerlistComponent,
    AddCardComponent,
    EditCardComponent,
    DeleteCardComponent,
    AdminrouterComponent,
    PlayerStatusComponent,
    WizardsComponent,
    UpgradeComponent,
    HistoryComponent,
    BattleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
