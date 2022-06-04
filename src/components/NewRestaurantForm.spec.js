import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {NewRestaurantForm} from './NewRestaurantForm';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';
  const requiredError = 'Name is required';
  const serverError = 'The restaurant could not be saved. Please try again.';

  let createRestaurant;

  function renderComponent() {
    createRestaurant = jest.fn().mockName('createRestaurant');
    render(<NewRestaurantForm createRestaurant={createRestaurant} />);
  }

  describe('initially', () => {
    it('does not display a validation error', () => {
      renderComponent();
      expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
    });

    it('does not display a server error', () => {
      renderComponent();
      expect(screen.queryByText(serverError)).not.toBeInTheDocument();
    });
  });

  it('allows successfully saving the restaurant to the server', async () => {
    renderComponent();
    createRestaurant.mockResolvedValue();
    await userEvent.type(
      screen.getByPlaceholderText('Add Restaurant'),
      restaurantName,
    );
    userEvent.click(screen.getByText('Add'));

    await waitFor(() =>
      expect(screen.getByPlaceholderText('Add Restaurant').value).toEqual(''),
    );

    expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
    expect(screen.queryByText(serverError)).not.toBeInTheDocument();
    expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
  });

  it('requires name to be filled in', async () => {
    renderComponent();

    userEvent.click(screen.getByText('Add'));

    await screen.findByText(requiredError);
    expect(createRestaurant).not.toHaveBeenCalled();
  });

  it('allows correcting a validation error', async () => {
    renderComponent();
    createRestaurant.mockResolvedValue();

    userEvent.click(screen.getByText('Add'));

    await userEvent.type(
      screen.getByPlaceholderText('Add Restaurant'),
      restaurantName,
    );
    userEvent.click(screen.getByText('Add'));

    await waitFor(() =>
      expect(screen.getByPlaceholderText('Add Restaurant').value).toEqual(''),
    );
    expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
  });

  it('displays an error when the store action rejects', async () => {
    renderComponent();
    createRestaurant.mockRejectedValue();

    await userEvent.type(
      screen.getByPlaceholderText('Add Restaurant'),
      restaurantName,
    );
    userEvent.click(screen.getByText('Add'));

    await screen.findByText(serverError);

    expect(screen.getByPlaceholderText('Add Restaurant').value).toEqual(
      restaurantName,
    );
  });

  it('allows retrying after a server error', async () => {
    renderComponent();
    createRestaurant.mockRejectedValueOnce().mockResolvedValueOnce();

    await userEvent.type(
      screen.getByPlaceholderText('Add Restaurant'),
      restaurantName,
    );
    userEvent.click(screen.getByText('Add'));
    await screen.findByText(serverError);

    userEvent.click(screen.getByText('Add'));
    await waitFor(() =>
      expect(screen.getByPlaceholderText('Add Restaurant').value).toEqual(''),
    );

    expect(screen.queryByText(serverError)).not.toBeInTheDocument();
  });
});
