import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PricingPlan } from 'src/app/models/pricing-plan';
import { PricingPlanService } from 'src/app/services/pricingPlan/pricing-plan.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-plan',
  templateUrl: './single-plan.component.html'
})
export class SinglePlanComponent implements OnInit {

  type!: string
  pricingPlan!: PricingPlan
  updateForm!: FormGroup
  editMode: boolean = false
  isSuccessShown: boolean = false
  isDangerShown: boolean = false
  errorMessage?: string
  successMessage?: string
  alertTimeout: any


  constructor(private activeRoute: ActivatedRoute, private pricingPlanService: PricingPlanService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.type = params['type']
      this.getOne()
    })
    this.updateForm = new FormGroup({
      hourlyPricing: new FormControl(null, Validators.required),
      dailyPricing: new FormControl(null, Validators.required),
      minimumHours: new FormControl(null, Validators.required)
    })
  }


  getOne() {
    this.pricingPlanService.getOne(this.type).subscribe({
      next: (pricingPlan: PricingPlan) => {
        this.pricingPlan = pricingPlan
      },
      error: (err) => {
        this.errorMessage = err.error
        this.errorAlert(this.errorMessage)
      }
    })
  }

  update() {
    this.pricingPlanService.update(this.type, this.updateForm.value).subscribe({
      next: (updatedPlan: PricingPlan) => {
        this.pricingPlan = updatedPlan
      },
      error: (err) => {
        this.errorMessage = err.error
        this.errorAlert(this.errorMessage)
      }
    });
  }

  fillModal() {
    this.updateForm.patchValue({
      hourlyPricing: this.pricingPlan.hourlyPricing,
      dailyPricing: this.pricingPlan.dailyPricing,
      minimumHours: this.pricingPlan.minimumHours
    })
  }


  errorAlert(err?: string) {
    this.isDangerShown = true;
    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isDangerShown = false
    })
  }

  successAlert(success?: string) {
    this.isSuccessShown = true

    clearTimeout(this.alertTimeout);

    this.alertTimeout = setTimeout(() => {
      this.isSuccessShown = false;
    }, 2500)
  }

}
