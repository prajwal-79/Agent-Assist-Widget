import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyWebComponentComponent } from './my-web-component/my-web-component.component';
import { createCustomElement } from '@angular/elements';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MyWebComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
//   entryComponents :  [
//     MyWebComponentComponent
//  ]
})
export class AppModule {
  constructor(private injector: Injector) {
      const componentElement = createCustomElement(MyWebComponentComponent, { injector });
      customElements.define('my-web-component', componentElement);
  }
}