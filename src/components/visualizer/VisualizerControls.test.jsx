import { render, screen, fireEvent } from '@testing-library/react';
import VisualizerControls from './VisualizerControls';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

describe('VisualizerControls', () => {
  it('renders correctly', () => {
    render(
      <VisualizerControls 
        isPlaying={false} 
        currentStep={0} 
        totalSteps={10} 
        onPlayPause={() => {}} 
        onStepChange={() => {}} 
      />
    );
    expect(screen.getByTitle('Play')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument(); // Current step
    expect(screen.getByText('9')).toBeInTheDocument(); // Max step
  });

  it('calls onPlayPause when play button is clicked', () => {
    const handlePlayPause = vi.fn();
    render(
      <VisualizerControls 
        isPlaying={false} 
        currentStep={0} 
        totalSteps={10} 
        onPlayPause={handlePlayPause} 
        onStepChange={() => {}} 
      />
    );
    fireEvent.click(screen.getByTitle('Play'));
    expect(handlePlayPause).toHaveBeenCalledTimes(1);
  });

  it('calls onStepChange when next button is clicked', () => {
    const handleStepChange = vi.fn();
    render(
      <VisualizerControls 
        isPlaying={false} 
        currentStep={0} 
        totalSteps={10} 
        onPlayPause={() => {}} 
        onStepChange={handleStepChange} 
      />
    );
    fireEvent.click(screen.getByTitle('Next Step'));
    expect(handleStepChange).toHaveBeenCalledWith(1);
  });
});
