<?php

namespace App\Models;

use App\Models\SubscriptionPlan;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserSubscription extends Model
{
  use HasFactory, SoftDeletes;

  protected $fillable = [
    'user_id',
    'subscription_id',
    'price',
    'expires_at',
    'payment_status',
    'snapToken',
  ];

  /**
   * Get the subscriptionPlan that owns the UserSubscription
   *
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function subscriptionPlan(): BelongsTo
  {
    return $this->belongsTo(SubscriptionPlan::class);
  }
}