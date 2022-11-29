import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css'],
})
export class ClipsListComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.handleScroll);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    // const { scrollTop, offsetHeight } = document.documentElement;
    // const { innerHeight } = window;

    // const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

    // if (bottomOfWindow) {
    //   console.log('bottom of window');
    // }

    // trigger when user reaches bottom of page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      console.log('bottom of page');
    }
  };
}
