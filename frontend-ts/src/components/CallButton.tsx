import { useState } from 'react';

type CallButtonProps<TRequest, TResponse> = {
  apiCall: (data: TRequest, token: string) => Promise<TResponse>;
  buttonText: string;
  requestData?: TRequest;
  getToken: () => Promise<string>; // Function to get the token dynamically
  onSuccess?: (response: TResponse) => void;
  onError?: (error: Error) => void;
};

const CallButton = <TRequest, TResponse>({
  apiCall,
  buttonText,
  requestData,
  getToken,
  onSuccess,
  onError,
}: CallButtonProps<TRequest, TResponse>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await getToken(); // Get the latest auth token
      if (!token) throw new Error('User not authenticated');

      const response = await apiCall(requestData as TRequest, token);
      onSuccess?.(response);
    } catch (err) {
      setError('An error occurred');
      onError?.(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : buttonText}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CallButton;
