import React from 'react';
import { Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0d1117] text-white mt-24">
      <div className="container mx-auto px-4 lg:px-[50px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-24">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src="https://kitainu.org/logo.svg" alt="KITA INU" className="w-12 h-12" />
              <span className="text-2xl font-bold">KitaInu.org</span>
            </div>
            <p className="text-gray-400 mb-4">Connect with us on social media</p>
            <div className="flex gap-4">
              <a href="https://t.me/KitaInuOfficial" target="_blank" rel="noopener noreferrer" className="hover:text-[#8364ac] transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="http://twitter.com/kitainuofficial" target="_blank" rel="noopener noreferrer" className="hover:text-[#8364ac] transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://discord.com/invite/Z6K4gnGKwP" target="_blank" rel="noopener noreferrer" className="hover:text-[#8364ac] transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a href="https://www.reddit.com/user/KitaInu" target="_blank" rel="noopener noreferrer" className="hover:text-[#8364ac] transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">INFO AND SOCIALS</h3>
            <ul className="space-y-3">
              <li><a href="https://support.uniswap.org/hc/en-us/articles/25655102348813-How-to-buy-crypto-in-the-Uniswap-Wallet" className="text-gray-400 hover:text-white transition-colors">How to Buy</a></li>
              <li><a href="https://medium.com/@kitainutoken" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="https://kitainu.org/swap" className="text-gray-400 hover:text-white transition-colors">KitaSwap</a></li>
              <li><a href="https://github.com/KitaInuOfficial" className="text-gray-400 hover:text-white transition-colors">Github</a></li>
              <li><a href="http://twitter.com/kitainuofficial" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
              <li><a href="https://t.me/KitaInuOfficial" className="text-gray-400 hover:text-white transition-colors">Telegram</a></li>
              <li><a href="https://discord.com/invite/Z6K4gnGKwP" className="text-gray-400 hover:text-white transition-colors">Discord</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">IMPORTANT LINKS</h3>
            <ul className="space-y-3">
              <li><a href="https://github.com/KitaInuOfficial/whitepaper/blob/main/whitepaper.pdf" className="text-gray-400 hover:text-white transition-colors">Whitepaper</a></li>
              <li><a href="https://github.com/KitaInuOfficial/audit/blob/main/audit.pdf" className="text-gray-400 hover:text-white transition-colors">Security Audit</a></li>
              <li><a href="https://www.geckoterminal.com/eth/pools/0x546638046ca366375ec2610ef48f5286b303306c" className="text-gray-400 hover:text-white transition-colors">Live Chart</a></li>
              <li><a href="https://etherscan.io/token/0x546638046ca366375ec2610ef48f5286b303306c" className="text-gray-400 hover:text-white transition-colors">Etherscan</a></li>
              <li><a href="https://bscscan.com/token/0x4bb5b7f0865322fd5b48d430e1a117235744769b" className="text-gray-400 hover:text-white transition-colors">Bscscan</a></li>
              <li><a href="mailto:info@kitainu.org" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="https://kitainu.org/disclaimer" className="text-gray-400 hover:text-white transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="py-8 border-t border-gray-800 text-center text-gray-400">
          Copyright © KitaInu.org
        </div>
      </div>
    </footer>
  );
};