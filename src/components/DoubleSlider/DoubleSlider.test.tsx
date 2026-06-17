import { fireEvent, render, screen } from "@testing-library/react";
import { VoiceType } from "../Voice/Voice.types";
import DoubleSlider from "./DoubleSlider";

describe('DoubleSlider', () => {
    
    it('handles range input changes correctly', () => {
        const mockSetVoices = jest.fn();
        const voices: Partial<VoiceType>[] = [{
            minLevel: 10,
            maxLevel: 50
        }];

        const props = { name: "level"}

        render(
            <DoubleSlider
                attrName="level"
                i={0}
                voices={voices as VoiceType[]}
                setVoices={mockSetVoices}
                {...props}
            />
        );

        const rangeSlider = screen.getByRole('slider', {name: "level"});
        
        fireEvent.input(rangeSlider, { target: { value: [20, 60] } });

        expect(mockSetVoices).toHaveBeenCalledWith([
            {
                minLevel: 20,
                maxLevel: 60,
            }
        ]);
    });
})