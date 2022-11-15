<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;

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
    return $subscriptionPlan;
  }
}