import {CreateNgo, ReturnNGO} from '../service';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NGOService {
  public registerNGO(createNgo: CreateNgo): Observable<HttpResponse<any>>{
    alert(JSON.stringify(["post NGO", createNgo]));

    return new BehaviorSubject( new HttpResponse({ status: 200 })).asObservable();
  }

  public ngoControllerGetMeV1(): Observable<ReturnNGO>{
    const ngoData: ReturnNGO = {
      id: 1,
      name: "Helping Hands",
      email: "contact@helpinghands.org",
      website_url: "https://www.helpinghands.org",
      description: "Helping Hands is dedicated to making the world a better place through education, health, and environmental initiatives.",
      banner_uri: "https://example.com/banner.jpg",
      address: "123 Charity Lane, Goodwill City, Country",
      contact: "+1234567890",
      scope: ["NOT_IMPLEMENTED"],
      projects: [
        {
          pagination: {
            currentPage: 1,
            numberOfPages: 1,
            filteredResults: 3,
            totalResults: 3,
          },
          projects: [
            {
              id: 101,
              name: "Education for All",
              description: "Providing quality education to underprivileged children.",
              banner_uri: "https://example.com/project1.jpg",
              fundraising_goal: 50000,
              fundraising_current: 20000,
              fundraising_closed: false,
              progress: 40,
              target_date: "2025-12-31",
              createdAt: "2023-01-01",
              updatedAt: "2023-12-31",
              category: "Education",
              ngoId: 1,
            },
            {
              id: 102,
              name: "Clean Water Initiative",
              description: "Ensuring access to clean and safe drinking water in rural areas.",
              banner_uri: "https://example.com/project2.jpg",
              fundraising_goal: 75000,
              fundraising_current: 50000,
              fundraising_closed: false,
              progress: 66.67,
              target_date: "2026-06-30",
              createdAt: "2023-06-01",
              updatedAt: "2023-12-31",
              category: "Health",
              ngoId: 1,
            },
            {
              id: 103,
              name: "Tree Plantation Drive",
              description: "Planting trees to combat deforestation and climate change.",
              banner_uri: "https://example.com/project3.jpg",
              fundraising_goal: 30000,
              fundraising_current: 30000,
              fundraising_closed: true,
              progress: 100,
              target_date: "2024-12-31",
              createdAt: "2022-01-01",
              updatedAt: "2024-12-31",
              category: "Environment",
              ngoId: 1,
            },
          ],
        },
      ],
    };
    return new BehaviorSubject(ngoData).asObservable();
  }
}
