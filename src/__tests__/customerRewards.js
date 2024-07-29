import { render, screen } from '@testing-library/react';
import CustomerRewards from "../components/CustomerRewards/CustomerRewards";

describe('Test Customer Rewards Component', () => {
    test('Loads Customer Rewards Points', () => {
    render(<CustomerRewards />);
    const linkElement = screen.getByText("Loading...");
    expect(linkElement).toBeInTheDocument();
    });
});