/* eslint-disable @typescript-eslint/no-explicit-any */

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TResponse<T> = {
  data: {
    accessToken: any;
    data: any;
    result?: T;
    success: boolean;
    message: string;
  };
  error?: TError;
};

export interface IEvent {
  _id: string;
  title: string;
  instructorName: string;
  images: string[];
  status: string;
  date: string;
  endTime: string;
  startTime: string;
  location: string;
  description: string;
  eligibilityCriteria: string[];
  sponsorLogos: string[];
  createdAt: string;
  updatedAt: Date;
}

export interface ISession {
  _id: string;
  title: string;
  instructorName: string;
  images: string[];
  status: string;
  date: string;
  sessionLink: string;
  endTime: string;
  startTime: string;
  location: string;
  description: string;
  eligibilityCriteria: string[];
  createdAt: string;
  sponsorLogos: string[];
  updatedAt: Date;
}

export interface IArticle {
  _id: string;
  title: string;
  thumbnailImage: string;
  authorName: string;
  bio: string;
  content: string;
  createdAt: string;
  updatedAt: Date;
}

export interface IExecutives {
  _id: string;
  profileImage: string;
  fullName: string;
  contact: string;
  email: string;
  position: string;
  communitySession: string;
  session: string;
  roleType: string;
  role: string;
  linkedin: string;
  facebook: string;
  twitter: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommittee {
  _id: string;
  year: string;
}
