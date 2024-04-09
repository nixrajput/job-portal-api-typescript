export enum EHttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum EJobType {
  Remote = "remote",
  InOffice = "in-office",
  Hybrid = "hybrid",
}

export enum EJobStatus {
  Applied = "applied",
  Shortlisted = "shortlisted",
  Accepted = "accepted",
  Rejected = "rejected",
  Deleted = "deleted",
  Cancelled = "cancelled",
  Finished = "finished",
}

export enum EUserStatus {
  active = "active",
  inactive = "inactive",
  deactivated = "deactivated",
  suspended = "suspended",
  blocked = "blocked",
  deleted = "deleted",
  banned = "banned",
  reported = "reported",
  pending = "pending",
  withheld = "withheld",
  restricted = "restricted",
}

export enum EUserType {
  JobSeeker = "job-seeker",
  Recruiter = "recruiter",
}
