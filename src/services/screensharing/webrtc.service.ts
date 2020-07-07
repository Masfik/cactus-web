import { StreamScreenService } from "@/services/screensharing/stream-screen.service";

export class WebRTCService implements StreamScreenService {
  private stream: MediaStream | undefined;

  constructor(private readonly constraints: MediaStreamConstraints = {}) {
    this.constraints = {
      video: true,
      audio: true,
      ...constraints
    };
  }

  async startStream(): Promise<MediaStream> {
    return (this.stream = await navigator.mediaDevices.getDisplayMedia(
      this.constraints
    ));
  }

  endStream(): void {
    this.stream?.getTracks().forEach(track => track.stop());
  }
}
