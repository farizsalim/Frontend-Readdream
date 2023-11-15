import React, { useEffect } from 'react';

const DisqusComments = ({ pageUrl, pageIdentifier }) => {
  const disqussURL = process.env.REACT_APP_DISQUSSURL
  const url = process.env.REACT_APP_URL

  useEffect(() => {
    window.disqus_config = function () {
      this.page.url = `${url}/${pageUrl}`;
      this.page.identifier = pageIdentifier;
    };

    const script = document.createElement('script');
    script.src = disqussURL;
    script.setAttribute('data-timestamp', +new Date());
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [pageUrl,url, pageIdentifier, disqussURL]);

  return (
    <div>
      <div id="disqus_thread"></div>
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </div>
  );
};

export default DisqusComments;
