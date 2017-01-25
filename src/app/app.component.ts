import { Component, OnInit } from '@angular/core';
import { TwitterService } from './twitter.service';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  view: GridDataResult;
  tweets: any = [];
  private pageSize: number = 5;
  private skip: number = 0;

  constructor(private twitterService: TwitterService) { }

  ngOnInit() {
    this.twitterService.getTweets()
      .subscribe(
        tweets => {
          this.tweets = tweets;
          this.view = {
            data: this.tweets.slice(this.skip, this.skip + this.pageSize),
            total: this.tweets.length
          };
        }
      );

  }

  protected pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.view.data = this.tweets.slice(this.skip, this.skip + this.pageSize);
  }
}
