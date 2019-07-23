# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "dylmye.me"
  spec.version       = "1.1.1"
  spec.authors       = ["Brandon Rosage", "Dylan Myers"]

  spec.summary       = "Personal website based on the Github Personal Website project."
  spec.homepage      = "https://dylmye.me"
  spec.license       = "MIT"
  s.metadata         = { "source_code_uri" => "https://github.com/dylmye/dylmye.github.io" }

  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))}i)
  end

  spec.add_runtime_dependency "jekyll", "~> 3.7"

  spec.add_development_dependency "bundler", "~> 2.0.1"
  spec.add_development_dependency "rake", "~> 12.0"
end
