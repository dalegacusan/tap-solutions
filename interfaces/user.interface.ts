export interface User {
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  socialMediaLinks: {
    twitter: string;
    facebook: string;
    instagram: string;
    linkedIn: string;
    youtube: string;
    tiktok: string;
  };
  communication: {
    whatsApp: string;
    viber: string;
    telegram: string;
  };
  websiteUrl: string;
  aboutMe: string;
  emailAddress: string;
  address: string;
  jobTitle: string;
  company: string;
  profilePictureUrl: string;
  bannerUrl: string;
  backgroundUrl: string;
  portfolioImages: string[];
  password?: string;
  dateCreated: Date;
  dateUpdated: Date;
}
