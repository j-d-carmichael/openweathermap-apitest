export default interface Weather {
  coord?: { lon?: number; lat?: number };
  weather?: {
    id?: number;
    main?: string;
    description?: string;
    icon?: string;
  }[];
  base?: string;
  main?: {
    temp?: number;
    pressure?: number;
    humidity?: number;
    temp_min?: number;
    temp_max?: number;
    sea_level?: number;
    grnd_level?: number;
  };
  wind?: { speed?: number; deg?: number; clouds?: { all?: number } };
  dt?: number;
  sys?: {
    message?: number;
    country?: string;
    sunrise?: number;
    sunset?: number;
  };
  id?: number;
  name?: string;
  cod?: number;
}
