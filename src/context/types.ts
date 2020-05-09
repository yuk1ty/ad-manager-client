export interface UserData {
  id: number;
  name: string;
  emailAddress: string;
  agency: { id: number; name: string };
  role: number;
}

export interface AgencyData {
  id: number;
  name: string;
}

export interface AdvertiserData {
  id: number;
  name: string;
  domain: string;
  agencyName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignData {
  id: number;
  name: string;
  deliveryStatus: number;
  billingType: number;
  monthlyBudgetLimit: number;
  dailyBudgetUpperLimit: number;
  charge: number;
  deliveryStartAt: string;
  deliveryEndAt: string;
  adGroups: AdGroupData[];
  createdAt: string;
  updatedAt: string;
}

export interface AdGroupData {
  id: number;
  name: string;
  monthlyBudget: number;
  dailyBudget: number;
  deliveryStartAt: string;
  deliveryEndAt: string;
  segments: SegmentData[];
  ads: AdData[];
  createdAt: string;
  updatedAt: string;
}

export interface SegmentData {}

export interface AdTableData {
  id: number;
  name: string;
  deliverySwitch: number;
  creatives: Creative[];
  createdAt: string;
}

export interface Creative {
  id: number;
  name: string;
  creativeType: {
    width: number;
    height: number;
    fileSize: number;
    mime: string;
  };
  url: string;
}

export interface AdData {
  id: number;
  name: string;
  landingPageUrl: string;
  deliverySwitch: number;
  creative: Creative | null;
  createdAt: string;
  updatedAt: string;
}
