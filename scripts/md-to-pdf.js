const { mdToPdf } = require('md-to-pdf');
const path = require('path');
const fs = require('fs');

async function convertMarkdownToPdf() {
  const markdownFile = path.join(__dirname, '..', 'PROJECT_WALKTHROUGH.md');
  const outputFile = path.join(__dirname, '..', 'PROJECT_WALKTHROUGH.pdf');
  const stylesheetFile = path.join(__dirname, 'pdf-styles.css');

  if (!fs.existsSync(markdownFile)) {
    console.error(`Error: ${markdownFile} not found!`);
    process.exit(1);
  }

  try {
    console.log('Converting markdown to PDF...');
    console.log(`Input: ${markdownFile}`);
    console.log(`Output: ${outputFile}`);

    const pdf = await mdToPdf(
      { path: markdownFile },
      {
        dest: outputFile,
        pdf_options: {
          format: 'A4',
          margin: {
            top: '20mm',
            right: '15mm',
            bottom: '20mm',
            left: '15mm',
          },
          printBackground: true,
        },
        stylesheet: stylesheetFile,
      }
    );

    if (pdf) {
      console.log('✅ PDF created successfully!');
      console.log(`📄 Output: ${outputFile}`);
    } else {
      console.error('❌ Failed to create PDF');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error converting to PDF:', error.message);
    process.exit(1);
  }
}

convertMarkdownToPdf();
