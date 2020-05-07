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

export interface AdTableData {}

export interface AdData {}
