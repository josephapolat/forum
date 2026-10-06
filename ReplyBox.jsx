export default function ReplyBox({ value, onChange }) {
  return (
    <textarea
      placeholder="Write your reply..."
      rows={4}
      cols={50}
      style={{ display: 'block', marginTop: '10px' }}
      value={value}
      onChange={onChange}
    />
  );
}