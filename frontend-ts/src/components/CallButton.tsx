import { useState } from 'react';

type CallButtonProps<TRequest, TResponse> = {
  apiCall: (data: TRequest | undefined, token: string) => Promise<TResponse>;
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
      const token = await getToken();
      console.log('✅ Token received in CallButton:', token); // Debugging

      if (!token) throw new Error('User not authenticated in CallButton');

      // ✅ Ensure token is passed as a direct argument
      const response = await apiCall(requestData, token);
      onSuccess?.(response);
    } catch (err) {
      console.error('❌ CallButton Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
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
