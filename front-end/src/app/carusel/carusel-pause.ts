import { Component, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({selector: 'ngbd-carousel-pause', styleUrls: ['./carusel-pause.scss'], templateUrl: './carusel-pause.html'})
export class NgbdCarouselPause {
  images = [
    "../../assets/carusel-img/1.jfif",
    "../../assets/carusel-img/1.png",
    "../../assets/carusel-img/2.jpg",
    "../../assets/carusel-img/3.jpg",
    "../../assets/carusel-img/4.jpg",
    "../../assets/carusel-img/5.jpg",
    "../../assets/carusel-img/6.webp"
  ]

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', {static : true}) carousel?: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel?.cycle();
    } else {
      this.carousel?.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}