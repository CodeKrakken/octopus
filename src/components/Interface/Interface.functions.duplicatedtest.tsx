import { setUpVoice } from './Interface.functions';
import { VoiceType } from '../Voice/Voice.types';

describe('Interface.functions', () => {
  describe('setUpVoice', () => {
    // it('creates a new voice with default values when no template is provided', () => {
    //   const voice = setUpVoice();

    //   expect(voice.isActive).toBe(false);
    //   expect(voice.label).toBe(1);
    //   expect(voice.nextInterval).toBe(0);
    //   expect(voice.bpm).toBe(60);
    //   expect(voice.minLevel).toBe(100);
    //   expect(voice.maxLevel).toBe(100);
    //   expect(voice.restChance).toBe(0);
    //   expect(voice.minLength).toBe(100);
    //   expect(voice.maxLength).toBe(100);
    //   expect(voice.minOffset).toBe(0);
    //   expect(voice.maxOffset).toBe(0);
    //   expect(voice.minDetune).toBe(0);
    //   expect(voice.maxDetune).toBe(0);
    //   expect(voice.minFadeIn).toBe(100);
    //   expect(voice.maxFadeIn).toBe(100);
    //   expect(voice.minFadeOut).toBe(100);
    //   expect(voice.maxFadeOut).toBe(100);
    // });

    // it('creates arrays with correct default values', () => {
    //   const voice = setUpVoice();

    //   expect(voice.activeNotes).toEqual(['1', '3', '5', '6', '8', '10', '12', '13']);
    //   expect(voice.activeOctaves).toEqual(['4']);
    //   expect(voice.activeIntervals).toEqual(['1']);
    //   expect(voice.activeSounds).toEqual(['sine']);
    // });

    // it('increments label when template is provided', () => {
    //   const template: VoiceType = setUpVoice();
    //   template.label = 5;

    //   const voice = setUpVoice(template);

    //   expect(voice.label).toBe(6);
    // });

    // it('inherits numeric properties from template when provided', () => {
    //   const template: VoiceType = setUpVoice();
    //   template.bpm = 120;
    //   template.restChance = 25;
    //   template.minLevel = 50;
    //   template.maxLevel = 80;

    //   const voice = setUpVoice(template);

    //   expect(voice.bpm).toBe(120);
    //   expect(voice.restChance).toBe(25);
    //   expect(voice.minLevel).toBe(50);
    //   expect(voice.maxLevel).toBe(80);
    // });

    // it('inherits array properties from template when provided', () => {
    //   const template: VoiceType = setUpVoice();
    //   template.activeNotes = ['2', '4', '6'];
    //   template.activeOctaves = ['3', '5'];
    //   template.activeSounds = ['square', 'sine'];
    //   template.activeIntervals = ['0.5'];

    //   const voice = setUpVoice(template);

    //   expect(voice.activeNotes).toEqual(['2', '4', '6']);
    //   expect(voice.activeOctaves).toEqual(['3', '5']);
    //   expect(voice.activeSounds).toEqual(['square', 'sine']);
    //   expect(voice.activeIntervals).toEqual(['0.5']);
    // });

    // it('uses template for all fade properties when provided', () => {
    //   const template: VoiceType = setUpVoice();
    //   template.minFadeIn = 50;
    //   template.maxFadeIn = 200;
    //   template.minFadeOut = 30;
    //   template.maxFadeOut = 150;

    //   const voice = setUpVoice(template);

    //   expect(voice.minFadeIn).toBe(50);
    //   expect(voice.maxFadeIn).toBe(200);
    //   expect(voice.minFadeOut).toBe(30);
    //   expect(voice.maxFadeOut).toBe(150);
    // });

    // it('preserves isActive as false when created from template', () => {
    //   const template: VoiceType = setUpVoice();
    //   template.isActive = true;

    //   const voice = setUpVoice(template);

    //   expect(voice.isActive).toBe(false);
    // });

    // it('preserves nextInterval from template when it is truthy', () => {
    //   const template: VoiceType = setUpVoice();
    //   template.nextInterval = 5000;

    //   const voice = setUpVoice(template);

    //   expect(voice.nextInterval).toBe(5000);
    // });

    // it('defaults nextInterval to 0 when template has 0', () => {
    //   const template: VoiceType = setUpVoice();
    //   template.nextInterval = 0;

    //   const voice = setUpVoice(template);

    //   expect(voice.nextInterval).toBe(0);
    // });

    // it('handles null template explicitly', () => {
    //   const voice = setUpVoice(null);

    //   expect(voice.isActive).toBe(false);
    //   expect(voice.label).toBe(1);
    //   expect(voice.bpm).toBe(60);
    // });
  });
});
