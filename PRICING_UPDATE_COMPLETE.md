# ✅ Pricing Model Updated to Per-Minute Billing

## Live URL
**Production**: https://web-7wqglcr5x-ryanmmmmms-projects.vercel.app

## Pricing Structure

### Cost Analysis
- **Our Cost**: $0.40 per minute
- **Customer Price**: $0.85 per minute (after included minutes)
- **Margin**: $0.45 per minute (112.5% markup)

### Pricing Tiers

#### Free Tier
- **Price**: $0/month
- **Included**: 30 minutes per month
- **Value**: $25.50 worth of dubbing at standard rates

#### Creator Tier
- **Price**: $29.99/month
- **Included**: 43 minutes 
- **Rate**: $0.70 per minute for included time
- **Overage**: $0.85 per additional minute
- **Value**: Saves $6.56 on included minutes vs pay-per-minute

#### Custom/Enterprise
- **Price**: Contact for pricing
- **Features**: Volume discounts, all languages, API access, SLA

## Important Billing Rules

1. **Minimum Billing**: 1 minute
   - Even 30-second files are billed as 1 minute
   - This ensures profitability on short content

2. **Monthly Reset**: Usage resets on the 1st of each month

3. **No Rollover**: Unused minutes don't carry forward

## What Was Updated

### Landing Page
- Pricing section shows minutes instead of dubs
- Hero section: "30 free minutes/month"
- Pricing cards clearly show minute allocations
- "$0.85 per additional minute" displayed for Creator tier

### Dashboard
- Stats show "Minutes Used" and "Minutes Remaining"
- Usage bar tracks minutes not dubs
- Billing page displays minute-based plans

### Documentation
- CLAUDE.md updated with new pricing model
- API examples remain unchanged (billing is tracked separately)

## Revenue Projections

### Break-Even Analysis
- Each minute costs us $0.40
- Free tier: 30 minutes × $0.40 = $12 cost per user
- Creator tier: 43 minutes × $0.40 = $17.20 cost
- Creator profit: $29.99 - $17.20 = $12.79 per subscriber

### Additional Revenue
- Overage at $0.85/min with $0.40 cost = $0.45 profit per minute
- Average user doing 60 minutes would pay:
  - First 43 minutes: $29.99 (subscription)
  - Next 17 minutes: $14.45 (overage)
  - Total: $44.44/month

## Implementation Notes

1. **Billing System**: Need to track usage by minutes, not count
2. **Rounding**: Always round up to next minute for billing
3. **Usage Display**: Show exact seconds used but bill by minute
4. **Notifications**: Alert users at 80% and 100% of included minutes

## Next Steps

1. **Backend Implementation**
   - Track actual dubbing duration in database
   - Implement minute-based usage calculation
   - Add overage billing with Stripe

2. **SpeechLab Integration**
   - Pass duration from SpeechLab API response
   - Store duration with each dub record
   - Calculate cost based on actual minutes

3. **User Experience**
   - Add usage notifications
   - Show estimated cost before dubbing
   - Display running total in dashboard

## Marketing Advantages

1. **Transparent Pricing**: Users know exactly what they pay for
2. **Fair Usage**: Short clips don't consume full "dub credits"
3. **Scalable**: Heavy users can pay for what they use
4. **Competitive**: $0.85/minute is reasonable for AI dubbing

---

The pricing model is now live and ready for backend implementation to track actual usage.