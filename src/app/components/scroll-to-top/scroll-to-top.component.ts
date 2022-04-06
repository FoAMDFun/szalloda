import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
})
export class ScrollToTopComponent implements OnInit {
  @Input() position: string = 'top';

  constructor() {}

  ngOnInit(): void {}

  isScrolled(): boolean {
    return !(window.scrollY == 0);
  }

  scrollTo(): void {
    if (this.position == 'bottom')
      document
        .getElementById('copyright')
        ?.scrollIntoView({ behavior: 'smooth' });
    else
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
  }

  scrollElement(): void {}
}
