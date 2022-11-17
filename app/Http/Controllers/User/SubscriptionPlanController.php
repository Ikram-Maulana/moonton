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
  public function __construct()
  {
    // Set your Merchant Server Key
    \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
    // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
    \Midtrans\Config::$isProduction = env('MIDTRANS_IS_PRODUCTION');
    // Set sanitization on (default)
    \Midtrans\Config::$isSanitized = env('MIDTRANS_IS_SANITIZE');
    // Set 3DS transaction for credit card to true
    \Midtrans\Config::$is3ds = env('MIDTRANS_IS_3DS');
  }

  public function index()
  {
    $data = [
      'subscriptionPlans' => SubscriptionPlan::all(),
      'userSubscription' => null
    ];

    return inertia('User/Dashboard/SubscriptionPlan/Index', $data);
  }

  public function userSubscribe(Request $request, SubscriptionPlan $subscriptionPlan)
  {
    $data = [
      'user_id' => Auth::user()->id,
      'subscription_plan_id' => $subscriptionPlan->id,
      'price' => $subscriptionPlan->price,
      'payment_status' => 'pending',
    ];

    $userSubscription = UserSubscription::create($data);

    $params = [
      "transaction_details" => [
        "order_id" => $userSubscription->id . '-' . str()->random(5),
        "gross_amount" => $userSubscription->price,
      ],
    ];

    $snapToken = \Midtrans\Snap::getSnapToken($params);

    $userSubscription->update([
      'snap_token' => $snapToken
    ]);

    return inertia('User/Dashboard/SubscriptionPlan/Index', [
      'userSubscription' => $userSubscription,
    ]);
  }
}