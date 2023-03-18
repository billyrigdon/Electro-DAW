import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-guitar-amp',
  templateUrl: './guitar-amp.component.html',
  styleUrls: ['./guitar-amp.component.scss']
})
export class GuitarAmpComponent implements OnInit {  
  gainControl: number;
  bassControl: number;
  midControl: number;
  trebleControl: number;
  context: AudioContext;
  gainNode: GainNode;
  bassNode: BiquadFilterNode;
  midNode: BiquadFilterNode;
  trebleNode: BiquadFilterNode;
  
  constructor() { 
    this.gainControl = 0.5;
    this.bassControl = 0;
    this.midControl = 0;
    this.trebleControl = 0;
    this.context = new AudioContext();
    this.gainNode = new GainNode(this.context, {gain: this.gainControl});
    this.bassNode = new BiquadFilterNode(this.context, {
      type: 'lowshelf',
      frequency: 500,
      gain: this.bassControl
    });
    this.midNode = new BiquadFilterNode(this.context, {
      type: 'peaking',
      Q: Math.SQRT1_2,
      frequency: 1500,
      gain: this.midControl
    });
    this.trebleNode = new BiquadFilterNode(this.context, {
      type: 'highshelf',
      frequency: 3000,
      gain: this.trebleControl
    });
  }

  ngOnInit(): void {
    this.setupContext();
  }

  adjustGain(event: any) {
    this.gainNode.gain.setTargetAtTime(
      parseFloat(event.target.value),
      this.context.currentTime,
      .01
    );
  }

  adjustBass(event: any) {
    this.bassNode.gain.setTargetAtTime(
      parseInt(event.target.value),
      this.context.currentTime,
      .01
    );
  }

  adjustMid(event: any) {
    this.midNode.gain.setTargetAtTime(
      parseInt(event.target.value),
      this.context.currentTime,
      .01
    );
  }

  adjustTreble(event: any) {
    this.trebleNode.gain.setTargetAtTime(
      parseInt(event.target.value),
      this.context.currentTime,
      .01
    );
  }


  async setupContext() {
    const guitar = await this.getGuitar();
    if (this.context.state === 'suspended') {
      await this.context.resume();
    }
    const source = this.context.createMediaStreamSource(guitar);
    source
      .connect(this.bassNode)
      .connect(this.midNode)
      .connect(this.trebleNode)
      .connect(this.gainNode)
      .connect(this.context.destination)
  }

  getGuitar() {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        latency: 0
      }
    });
  }
}

