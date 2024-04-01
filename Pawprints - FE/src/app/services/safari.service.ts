import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const { apiURL } = environment;

export interface SafariCatalog {
  safaris: Safari[];
  totalNumberOfPages: number;
  currentPage: number;
}

export interface Safari {
  owner: string;
  _id: string;
  safariTitle: string;
  safariImage: '';
  days: Day[];
  period: {
    from: string;
    to: string;
  };
  rates: {
    twoPeopleOneRoom: string;
    threePeopleTwoRooms: string;
    fourPeopleTwoRooms: string;
    fivePeopleThreeRooms: string;
    sixPeopleThreeRooms: string;
  };
}

export interface Day {
  dayTitle: string;
  descriptions: string[];
  mainDestination: string;
  hotelName: string;
  hotelLink: string;
  hotelType: string;
  hotelLocation: string;
  includedMeals: string[];
  includedDrinks: string[];
  dayImage: string;
}

@Injectable({
  providedIn: 'root',
})
export class SafariService {
  constructor(private http: HttpClient) {}

  createSafari(safari: Safari) {
    return this.http.post<Safari>(`${apiURL}/safari/createSafari`, safari);
  }

  updateSafari(safariId: string | null, safari: Safari) {
    return this.http.post<Safari>(
      `${apiURL}/safari/updateSafari/${safariId}`,
      safari
    );
  }

  fetchCatalogSafaris(page: number) {
    const params = { page: page.toString() };
    return this.http.get<SafariCatalog>(
      `${apiURL}/safari/fetchCatalogSafaris`,
      { params }
    );
  }

  fetchSafariById(safariId: string) {
    return this.http.get<Safari>(
      `${apiURL}/safari/fetchSafariById/${safariId}`
    );
  }

  deleteSafari(safariId: string | undefined) {
    return this.http.delete(`${apiURL}/safari/deleteSafari/${safariId}`);
  }
}
