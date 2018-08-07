import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { MovieDetailsPage } from '../movie-details/movie-details';

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

    openMovieDetails(movie) {
        this.navCtrl.push(MovieDetailsPage, {movie_id: movie.id});
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
