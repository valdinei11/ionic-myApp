import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

@IonicPage()
@Component({
	selector: 'page-movie-details',
	templateUrl: 'movie-details.html',
	providers: [
		MovieProvider
	]
})
export class MovieDetailsPage {
    public loader;
    public refresher;
    public isRefreshing: boolean = false;
	public movie;
	public movie_id;
	
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
	
	ionViewDidEnter() {
		this.openLoadingModal();
		this.movie_id = this.navParams.get("movie_id");
		this.movieProvider.getMovieDetails(this.movie_id).subscribe(
			data => {
                this.movie = data;
				
				this.movie.genres = ((genres) => {
					let str = "";
					for (let i=0; i<genres.length; i++) {
						if (i==genres.length-1) {
							str += genres[i].name;
							break;
						}
						str += genres[i].name + ", ";
					}

					return str;
				})(this.movie.genres);

				console.log(this.movie);

                this.closeLoadingModal();
                if (this.isRefreshing) {
                    this.refresher.complete();
                    this.isRefreshing = false;
                }
            }, error => {
                console.log(error);
                this.closeLoadingModal();
            }
		);
		console.log('ionViewDidLoad MovieDetailsPage');
	}
	
}
