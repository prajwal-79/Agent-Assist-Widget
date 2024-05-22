import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { MyWebComponentComponent } from './my-web-component/my-web-component.component';

@NgModule({
  declarations: [
    AppComponent,
    MyWebComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents :  [
    MyWebComponentComponent
 ],
  providers: [DataService],
  bootstrap: [AppComponent],

})
export class AppModule {
  constructor(private injector: Injector) {
      const componentElement = createCustomElement(MyWebComponentComponent, { injector });
      customElements.define('agent-assist-copilot', componentElement);
  }


ngDoBootstrap() {}
}
