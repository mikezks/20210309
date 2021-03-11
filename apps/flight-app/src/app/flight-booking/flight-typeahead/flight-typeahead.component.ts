import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import { Observable } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit {
  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.flights$ =
      this.control.valueChanges.pipe(
        filter(city => city.length > 2),
        debounceTime(300),
        distinctUntilChanged(),
        tap(_ => this.loading = true),
        switchMap(city => this.load(city)),
        delay(1000),
        tap(_ => this.loading = false)
      );
  }

  load(from: string): Observable<Flight[]>  {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }

}
