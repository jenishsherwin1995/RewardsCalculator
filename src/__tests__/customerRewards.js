import { render, screen } from '@testing-library/react';
import CustomerRewards from "../components/CustomerRewards/CustomerRewards";

describe('Test Customer Rewards Component', () => {
    test('loads Customer Rewards Points', () => {
    render(<CustomerRewards />);
    const linkElement = screen.getByText(/Customer Rewards Points/i);
    expect(linkElement).toBeInTheDocument();
    });
});