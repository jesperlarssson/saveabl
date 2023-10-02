interface BodyContentProps {
  content: any;
}

const BodyContent: React.FC<BodyContentProps> = ({ content }) => {
  //Return div with innerHTML from blog post
  return (
    <div
      className={`post`}
      dangerouslySetInnerHTML={{ __html: content?.html }}
    />
  );
};

export default BodyContent;
