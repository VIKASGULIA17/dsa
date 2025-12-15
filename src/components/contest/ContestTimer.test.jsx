import { render, screen } from '@testing-library/react';
import ContestTimer from './ContestTimer';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

describe('ContestTimer', () => {
  it('renders upcoming status correctly', () => {
    const futureDate = new Date(Date.now() + 1000000).toISOString();
    const farFutureDate = new Date(Date.now() + 2000000).toISOString();
    
    render(<ContestTimer startTime={futureDate} endTime={farFutureDate} />);
    expect(screen.getByText('Starts In')).toBeInTheDocument();
  });

  it('renders ongoing status correctly', () => {
    const pastDate = new Date(Date.now() - 1000000).toISOString();
    const futureDate = new Date(Date.now() + 1000000).toISOString();
    
    render(<ContestTimer startTime={pastDate} endTime={futureDate} />);
    expect(screen.getByText('Ends In')).toBeInTheDocument();
  });
});
