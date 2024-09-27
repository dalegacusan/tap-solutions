export interface User {
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phoneNumber2: string;
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
  emailAddress2: string;
  emailAddress3: string;
  emailAddress4: string;
  address: string;
  jobTitle: string;
  company: string;
  profilePictureUrl: string;
  bannerUrl: string;
  bannerColor: string;
  backgroundUrl: string;
  backgroundColor: string;
  portfolioImages: string[];
  password?: string;
  dateCreated: Date;
  dateUpdated: Date;
}
