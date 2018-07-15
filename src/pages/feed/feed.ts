import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

    public movie_list = new Array<any>();
    
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private movieProvider: MovieProvider
    ) {
    }
    
    ionViewDidLoad() {
        this.movieProvider.getPopularMovies().subscribe(
            data => {
                // const response = JSON.stringify((data as any));
                // const object_return = JSON.parse(response);
                this.movie_list = (data as any).results;
                console.log(data);
            }, error => {
                console.log(error);
            }
        )
    }
    
}
