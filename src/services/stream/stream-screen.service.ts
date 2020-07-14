export interface StreamScreenService {
  startStream(): Promise<MediaStream>;

  endStream(): void;
}
