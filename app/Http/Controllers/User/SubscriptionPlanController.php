<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubscriptionPlanController extends Controller
{
  public function index()
  {
    $data = [
      'subscriptionPlans' => SubscriptionPlan::all(),
    ];

    return inertia('User/Dashboard/SubscriptionPlan/Index', $data);
  }

  public function userSubscribe(Request $request, SubscriptionPlan $subscriptionPlan)
  {
    $data = [
      'user_id' => Auth::user()->id,
      'subscription_plan_id' => $subscriptionPlan->id,
      'price' => $subscriptionPlan->price,
      'expired_date' => Carbon::now()->addMonth($subscriptionPlan->active_period_in_months),
      'payment_status' => 'paid',
    ];

    UserSubscription::create($data);

    return to_route('user.dashboard.index');
  }
}