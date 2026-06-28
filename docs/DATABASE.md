# Need Gone Database Notes

## Current Main Tables

### items

Stores listings.

Important fields:

- id
- title
- description
- location
- status
- owner_id
- image_url
- created_at
- updated_at
- pickup_type
- public_location
- private_address
- pickup_instructions
- pickup_window
- meetup_location
- meetup_time_options

Possible future fields:

- expires_at
- completed_at
- approved_request_id
- circle_id
- release_to_public_at

## Item Status Ideas

Current:

- AVAILABLE
- PENDING
- GONE

Possible improved statuses:

- DRAFT
- ACTIVE
- REQUESTED
- PENDING_PICKUP
- COMPLETED
- EXPIRED
- ARCHIVED

## pickup_requests

Stores requests from claimers.

Fields:

- id
- item_id
- requester_id
- owner_id
- requested_time
- status
- created_at
- updated_at

Request status ideas:

- REQUESTED
- APPROVED
- DECLINED
- CANCELED
- COMPLETED
- MISSED

## Future Tables

### profiles

Stores user profile info.

Possible fields:

- id
- email
- display_name
- avatar_url
- created_at

### reputation_events

Stores fact-based reputation events.

Possible fields:

- id
- user_id
- item_id
- pickup_request_id
- event_type
- created_at

Event types:

- ITEM_GIVEN
- ITEM_CLAIMED
- PICKUP_COMPLETED
- PICKUP_MISSED
- PICKUP_CANCELED

### giving_circles

Future feature.

Possible fields:

- id
- owner_id
- name
- description
- created_at

### giving_circle_members

Future feature.

Possible fields:

- id
- circle_id
- user_id
- role
- status
- created_at

Roles:

- OWNER
- MEMBER

Statuses:

- INVITED
- ACTIVE
- REMOVED

## Security Rules

Current idea:

- Anyone can view public active listings.
- Logged-in users can create listings.
- Owners can update and delete their own listings.
- Requesters can create pickup requests.
- Owners can view requests for their items.
- Requesters can view their own requests.
- Only approved requesters can see private pickup details.