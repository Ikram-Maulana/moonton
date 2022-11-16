<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
  /**
   * The root template that is loaded on the first page visit.
   *
   * @var string
   */
  protected $rootView = 'app';

  /**
   * Determine the current asset version.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return string|null
   */
  public function version(Request $request)
  {
    return parent::version($request);
  }

  /**
   * Define the props that are shared by default.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return mixed[]
   */
  private function activePlan()
  {
    $active_plan = Auth::user() ? Auth::user()->LastActiveUserSubcription : null;

    if (!$active_plan) {
      return null;
    }

    $lastDay = Carbon::parse($active_plan->updated_at)->addMonth($active_plan->subscriptionPlan->active_period_in_months);
    $activeDay = Carbon::parse($active_plan->updated_at)->diffInDays($lastDay);
    $remainingActiveDay = Carbon::parse($active_plan->expired_date)->diffInDays(Carbon::now());

    return [
      'name' => $active_plan->subscriptionPlan->name,
      'remainingActiveDays' => $remainingActiveDay,
      'activeDays' => $activeDay,
    ];
  }

  public function share(Request $request)
  {
    return array_merge(parent::share($request), [
      'auth' => [
        'user' => $request->user(),
        'activePlan' => $this->activePlan(),
      ],
      'ziggy' => function () use ($request) {
        return array_merge((new Ziggy)->toArray(), [
          'location' => $request->url(),
        ]);
      },
    ]);
  }
}