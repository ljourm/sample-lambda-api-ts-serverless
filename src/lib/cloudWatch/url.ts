export interface BuildCloudWatchLogStreamUrlProps {
  region: string;
  groupName: string;
  streamName: string;
  filterPattern?: string;
  start?: Date;
  end?: Date;
}

export const buildCloudWatchLogStreamUrl = (props: BuildCloudWatchLogStreamUrlProps): string => {
  const baseUrl = buildBaseUrl(props.region);
  const path = buildPath(props.groupName, props.streamName);
  const query = buildLogQuery(props.filterPattern, props.start, props.end);

  return `${baseUrl}${path}${query}`;
};

const buildBaseUrl = (region: string): string => {
  return `https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}`;
};

const buildPath = (groupName: string, streamName: string): string => {
  const encodedGroupName = encodeURIComponent(groupName);
  const encodedStreamName = encodeURIComponent(streamName);

  const path = ["log-groups", "log-group", encodedGroupName, "log-events", encodedStreamName]
    .map((str) => encodeForLog(str))
    .join("/");

  return `#logsV2:${path}`;
};

const buildLogQuery = (filterPattern: string, start: Date, end: Date): string => {
  const options = [];

  if (filterPattern) {
    const quotedFilterPattern = encodeURIComponent(`"${filterPattern}"`);
    options.push(`filterPattern=${quotedFilterPattern}`);
  }
  if (start) {
    options.push(`start=${start.getTime()}`);
  }
  if (end) {
    options.push(`end=${end.getTime()}`);
  }

  if (options.length === 0) return "";

  const query = `?${options.join("&")}`;

  return encodeForLog(query);
};

const encodeForLog = (str: string): string => {
  return encodeURIComponent(str).replace(/%/g, "$");
};
