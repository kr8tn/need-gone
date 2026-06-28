# Need Gone User Flows

## Main Giver Flow

1. Giver signs in.
2. Giver creates a listing.
3. Giver uploads a photo.
4. Giver chooses pickup type:
   - Porch Pickup
   - Public Meetup
5. Giver sets public location.
6. Giver sets pickup details.
7. Giver chooses expiration.
8. Listing becomes active.
9. Claimers request pickup.
10. Giver approves one requester.
11. Pickup details are revealed only to the approved requester.
12. Item becomes pending pickup.
13. Pickup happens.
14. Giver marks:
    - Picked up
    - Missed pickup
15. Reputation updates.
16. Listing is completed, expired, or offered to next requester.

## Main Claimer Flow

1. Claimer signs in.
2. Claimer browses listings.
3. Claimer opens listing details.
4. Claimer reviews:
   - item
   - public location
   - pickup type
   - pickup window or meetup options
5. Claimer requests pickup.
6. Claimer agrees to pickup expectations.
7. Claimer waits for approval.
8. If approved, claimer sees pickup details.
9. Claimer picks up item.
10. Claimer confirms pickup if needed.
11. Reputation updates.

## Porch Pickup Flow

Public listing shows:

- Public location
- Pickup window
- Item details
- Status

Private details are hidden until approval:

- Full address
- Pickup instructions
- Gate code or special instructions

After approval:

1. Claimer receives private address.
2. Claimer agrees to pickup during window.
3. Giver waits for pickup.
4. Giver marks completed or missed.

## Public Meetup Flow

Public listing shows:

- Meetup area
- Time options
- Item details
- Status

Flow:

1. Claimer chooses a time option.
2. Giver approves requester.
3. Meetup location and confirmed time are shown.
4. Giver and claimer meet.
5. Giver marks completed or missed.

## Missed Pickup Flow

1. Pickup window passes or giver decides pickup was missed.
2. Giver clicks "Didn't Show".
3. Request becomes MISSED.
4. Claimer reputation records missed pickup.
5. Giver chooses:
   - Offer to next requester
   - Reopen listing
   - Extend listing
   - Mark gone
   - Delete/archive listing

## Expiration Flow

Listings can expire so old posts do not waste people's time.

Expiration options:

- Today only
- 3 days
- 7 days
- Custom date
- Until picked up

When listing expires:

1. Listing leaves active browse results.
2. Giver sees expired status.
3. Giver can:
   - Republish
   - Extend
   - Archive
   - Delete

## Giving Circles Flow

Future feature.

1. User creates a circle.
2. User invites trusted people.
3. Giver posts item to circle first.
4. Circle members get first chance.
5. If nobody claims it after a set time, giver can release it publicly.
6. This creates a viral loop because people invite others so they do not miss good free items.