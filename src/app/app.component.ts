import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IntroPage } from '../pages/intro/intro';
import { ConfigProvider } from '../providers/config/config';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
    templateUrl: 'app.html',
    providers: [
        ConfigProvider
    ]
})
export class MyApp {
    rootPage:any;
    
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, configProvider: ConfigProvider) {
        platform.ready().then(() => {
            // A variable that contains a config data of localStorage item
            let config = configProvider.getConfigData();

            // If the item 'config' is null, then the IntroPage will be loaded and it won't be loaded anymore
            if (config == null) {
                this.rootPage = IntroPage;
                configProvider.setConfigData(false);
            } else {
                // If 'config' is not null, it means that it's not the first access, then it will redirecly to TabsPage
                this.rootPage = TabsPage;
            }
            
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}
