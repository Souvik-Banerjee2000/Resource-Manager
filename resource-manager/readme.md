# Expiring Temporary Resource Sharing Module

This project is a backend module that allows users to share resources (documents, links, files) temporarily, with an expiration mechanism. The module is built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.

---

## Features

- **Create Temporary Resources**: Users can upload/register resources with an expiration time.
- **Secure Access**: Each resource is linked to a user and accessed securely.
- **Auto Expiry**: Resources are automatically marked as expired after their expiration time.
- **Filterable Resource Queries**: Users can fetch active or expired resources.
- **Efficient Handling of Large Datasets**: Optimized queries ensure fast performance.

---

## Tech Stack

- **Backend**: Node.js, Express
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Task Scheduler**: Cron

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   npm i
   npm start
   ```

## Optimized Approach
    -> Upload a Resource on to S3
   -> Store the S3 Link in DB
   -> While Storing add a TTL
   -> At the time of expiry set a trigger to a lambda / script which will mark the particular record expired and move the content in a S3 Standard Infrequent Access Bucket and DB level mark the status column as expired
   -> Index by the status column in the DB (If Required) for a better Read query of all the Expired and Active Records

