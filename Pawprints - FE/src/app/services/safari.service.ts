import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

const { apiURL } = environment;

interface SafariTour {
  safariTitle: string;
  headerImage: File | null;
  route: Array<{
    day: string;
    dayTitle: string;
    description: string;
    mainDestination: string;
    accommodation: {
      name: string;
      type: string;
      location: string;
      link: string;
    };
    mealsAndDrinks: {
      includedMeals: string;
      drinksIncluded: string;
    };
    dayImage: File | null;
  }>;
  price: {
    period: {
      from: string;
      to: string;
    };
    rates: {
      twoPeopleOneRoom: { price: string };
      threePeopleTwoRooms: { price: string };
      fourPeopleTwoRooms: { price: string };
      fivePeopleThreeRooms: { price: string };
      sixPeopleThreeRooms: { price: string };
    };
  };
}

interface Price {
  period: {
    from: string;
    to: string;
  };
  rates: {
    twoPeopleOneRoom: { price: string };
    threePeopleTwoRooms: { price: string };
    fourPeopleTwoRooms: { price: string };
    fivePeopleThreeRooms: { price: string };
    sixPeopleThreeRooms: { price: string };
  };
}

@Injectable({
  providedIn: 'root',
})
export class SafariService {
  private safari$$ = new BehaviorSubject<Price | undefined>(undefined);
  public safari$ = this.safari$$.asObservable();
  safari: SafariTour | undefined;

  constructor(private http: HttpClient, private toast: ToastrService) {}

  uploadPrices(safariTag: string, period: {}, rates: {}) {
    return this.http
      .post<Price>(
        `${apiURL}/price/createPrice`,
        { safariTag, period, rates },
        { withCredentials: true }
      )
      .pipe(
        tap((x) => {
          this.safari$$.next(x);
        })
      );
  }
}
