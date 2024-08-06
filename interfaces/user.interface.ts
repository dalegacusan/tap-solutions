// Define export interfaces for nested objects and arrays

import { ReactNode } from 'react';

export interface Job {
  title: string;
  company: string;
}

export interface ContactInformation {
  icon: string;
  category: 'contactInformation';
  identifier: string;
  label?: string; // Optional, as not all contact items have a label
  value: string;
}

export interface SocialMedia {
  icon: string;
  category: 'socialMedia';
  identifier: string;
  value: string;
  link: string;
}

export interface Photo {
  img: string; // URL to the image
  title: string;
  description?: string; // Optional, as not all photos have a description
  rows?: number; // Optional
  cols?: number; // Optional
  featured?: boolean; // Optional
}

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  job: Job;
  address: string;
  contactInformation: ContactInformation[];
  socialMedia: SocialMedia[];
  photos: Photo[];
}
