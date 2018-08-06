import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
* Generated class for the FeedPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-feed',
    templateUrl: 'feed.html',
    providers: [
        MovieProvider
    ]
})
export class FeedPage {
    public posts = [
        {
            "username": "Calvin Klein",
            "date": "November 5, 1955",
            "imgURL": "https://ionicframework.com/dist/preview-app/www/assets/img/advance-card-bttf.png",
            "numLikes": "12",
            "numComments": "4",
            "timeSpend": "11h ago"
        },
        {
            "username": "Valdinei Ferreira",
            "date": "August 8, 2018",
            "content": "Hello, bitches",
            "numLikes": "42",
            "numComments": "8",
            "timeSpend": "84y ago" 
        }
    ];
    public loader;
    public refresher;
    public isRefreshing: boolean = false;
    public movie_list = new Array<any>();
    
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private movieProvider: MovieProvider,
        public loadingCtrl: LoadingController
    ) {
    }
    
    openLoadingModal() {
        this.loader = this.loadingCtrl.create({
            content: "Carregando..."
        });
        this.loader.present();
    }

    closeLoadingModal() {
        this.loader.dismiss();
    }

    doRefresh(refresher) {
        this.refresher = refresher;
        this.isRefreshing = true;

        this.loadMovies();
    }
    
    // Alterando o final de "Load" para "Enter"
    // Um Load é executado apenas quando recarrega os dados do aplicativo
    // Um Enter é executado quando entra/recarrega a página durante a execução do aplicativo
    ionViewDidEnter() {
        this.loadMovies();
    }

    loadMovies() {
        this.openLoadingModal();
        this.movieProvider.getPopularMovies().subscribe(
            data => {
                this.movie_list = (data as any).results;
                console.log(data);
                this.closeLoadingModal();
                if (this.isRefreshing) {
                    this.refresher.complete();
                    this.isRefreshing = false;
                }
            }, error => {
                console.log(error);
                this.closeLoadingModal();
            }
        )
    }
}
